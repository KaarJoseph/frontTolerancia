import { Component } from '@angular/core';
import { Email } from 'src/app/domain/email';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  email: Email = { to: '', subject: '', text: '' };

  constructor(private servicioService: ServicioService) {}

  sendEmail() {
    this.servicioService.sendEmail(this.email).subscribe(
      (response) => {
        console.log('Correo enviado exitosamente!', response);

        // Restablecer los valores del formulario
        this.email = { to: '', subject: '', text: '' };
      },
      (error) => {
        console.error('Error al enviar el correo:', error);

        // Verifica el tipo de error y toma decisiones específicas
        if (error.name === 'HttpErrorResponse' && error.status === 0) {
          console.error('Error de red: No se pudo conectar al servidor.');
          // Puedes mostrar un mensaje al usuario sobre el problema de red
        } else {
          console.error('Error desconocido. Consulta la consola para más detalles.');
          // Puedes mostrar un mensaje genérico de error al usuario
        }
      }
    );
  }
}
