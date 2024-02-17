import React from 'react';
import './presentacion.css';

const ConfiguracionesDashboard = () => {
  return (
    <div style={{
        border: "1px solid black",
        marginTop: "100px",
        height: "auto",
        width: "100",
        marginLeft: "300px",
        marginRight: "-10px",
        borderRadius: "10px",
        backgroundColor: "#c2bbbb", 
        boxShadow: "0 0 9px rgba(0, 0, 0, 0.7)", 
        marginBottom: "50px"
      }}>
    <div className="configuraciones-container">
      <h2 className="configuraciones-title">Configuraciones del Dashboard de Administrador</h2>
      <div className="configuraciones-text">
        <p>
          En el Dashboard de Administrador de la empresa Hostel Premium, se tienen diversas opciones de configuración que permiten gestionar usuarios, revisar y eliminar reviews, así como también administrar productos.
        </p>
        <h3 className="subtitulo">Modificación de Usuarios</h3>
        <p>
          La modificación de usuarios en el Dashboard de Administrador implica la capacidad de editar información de usuarios registrados, como sus datos personales, permisos de acceso y roles dentro de la plataforma. 
        </p>
        <p>
          Es importante considerar los riesgos asociados, ya que una modificación incorrecta de los datos de un usuario puede afectar su experiencia en la plataforma, generando insatisfacción y posibles reclamaciones.
        </p>
        <h3 className="subtitulo">Eliminación de Reviews</h3>
        <p>
          La eliminación de reviews permite gestionar el contenido generado por los usuarios. Al eliminar una review, se elimina la opinión o valoración de un usuario sobre un producto o servicio.
        </p>
        <p>
          Sin embargo, esta acción conlleva riesgos tanto para el usuario como para el administrador. Para el usuario, puede generar desconfianza si sus opiniones son eliminadas sin justificación, lo que afecta la reputación de la empresa. Para el administrador, puede haber repercusiones legales si la eliminación de reviews se percibe como censura o manipulación de la información.
        </p>
        <h3 className="subtitulo">Eliminación de Productos</h3>
        <p>
          La eliminación de productos del inventario del Hostel Premium implica la retirada de un producto o servicio de la oferta disponible para los clientes.
        </p>
        <p>
          Este proceso debe ser cuidadosamente gestionado, ya que la eliminación de productos puede afectar la disponibilidad y variedad de opciones para los usuarios. Además, debe considerarse el impacto en las ventas y la imagen de la empresa.
        </p>
        <p>
          Adicionalmente, es importante tener en cuenta que la eliminación de productos puede tener implicaciones logísticas y financieras, como el ajuste de inventario, la actualización de precios y la gestión de devoluciones.
        </p>
        <h3 className="subtitulo">Gestión de Roles y Permisos</h3>
        <p>
          La gestión de roles y permisos permite definir los niveles de acceso y las capacidades de cada usuario dentro del Dashboard de Administrador.
        </p>
        <p>
          Esta funcionalidad es crucial para garantizar la seguridad y la integridad de los datos, así como también para optimizar la eficiencia operativa al asignar responsabilidades específicas a cada miembro del equipo.
        </p>
        <p>
          Sin embargo, es fundamental establecer un proceso de revisión y auditoría periódica para garantizar que los permisos se ajusten a las necesidades del negocio y que no se produzcan brechas de seguridad.
        </p>
        <h3 className="subtitulo">Monitoreo de Actividad</h3>
        <p>
          El monitoreo de actividad permite rastrear y analizar las acciones realizadas por los usuarios dentro del Dashboard de Administrador.
        </p>
        <p>
          Esta función es esencial para identificar comportamientos anómalos, detectar posibles amenazas de seguridad y mantener la integridad de los datos.
        </p>
        <p>
          Además, el monitoreo de actividad puede proporcionar insights valiosos sobre el uso de la plataforma, ayudando a optimizar la experiencia del usuario y mejorar la eficiencia operativa.
        </p>
      </div>
    </div>
    </div>
  );
};

export default ConfiguracionesDashboard;