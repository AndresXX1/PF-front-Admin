import React from 'react';
import './presentacion.css';
import { Alert } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ConfiguracionesDashboard = () => {
  return (
    <div className='contenedorssd'>

    
    <div className="configuraciones-container">
      <h2 className='tit'>
        <div>
        {<WarningIcon />}

        </div>
          ADVERTENCIAS
        
      </h2>
      <div className="configuraciones-text">
        <h4 style={{ marginLeft: "10px", color: "salmon", fontSize: "22px",}}>Configuraciones del Dashboard de Administrador</h4>
        <div className='textods'>

          El Dashboard de Administrador de Hostel Premium ofrece diversas opciones de configuración para gestionar usuarios, reviews y productos. Sin embargo, es importante considerar cómo se presenta esta información al usuario para garantizar una experiencia de usuario óptima.
        </div>
        
        </div>
        <div className="configuraciones-text1">
        <h4 style={{ marginLeft: "10px", color: "salmon", fontSize: "22px",}}>Modificación de Usuarios</h4>
        <div className='textods'>

          La modificación de usuarios en el Dashboard de Administrador implica la capacidad de editar información de usuarios registrados, como sus datos personales, permisos de acceso y roles dentro de la plataforma. Esta funcionalidad conlleva riesgos significativos, ya que una modificación incorrecta de los datos de un usuario puede afectar su experiencia en la plataforma y generar insatisfacción, pérdida de confianza y posibles reclamaciones legales.
        </div>
        
        </div>
        <div className="configuraciones-text2">
        <h4 style={{ marginLeft: "10px", color: "salmon", fontSize: "22px",}}>Eliminación de Reviews</h4>
        <div className='textods'>

          La eliminación de reviews permite gestionar el contenido generado por los usuarios. Al eliminar una review, se elimina la opinión o valoración de un usuario sobre un producto o servicio. Sin embargo, esta acción conlleva riesgos tanto para el usuario como para el administrador. Para el usuario, puede generar desconfianza si sus opiniones son eliminadas sin justificación, lo que afecta la reputación de la empresa. Para el administrador, puede haber repercusiones legales si la eliminación de reviews se percibe como censura o manipulación de la información.
        </div>
        
        </div>
        <div className="configuraciones-text3">
        <h4 style={{ marginLeft: "10px", color: "salmon", fontSize: "22px",}}>Eliminación de Productos</h4>
        <div className='textods'>

          La eliminación de productos del inventario del Hostel Premium implica la retirada de un producto o servicio de la oferta disponible para los clientes. Este proceso debe ser cuidadosamente gestionado, ya que la eliminación de productos puede afectar la disponibilidad y variedad de opciones para los usuarios. Además, debe considerarse el impacto en las ventas y la imagen de la empresa, así como las implicaciones logísticas y financieras, como el ajuste de inventario, la actualización de precios y la gestión de devoluciones.
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default ConfiguracionesDashboard;