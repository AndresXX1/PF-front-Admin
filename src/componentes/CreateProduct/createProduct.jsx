import * as React from 'react'
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select';
import './create.css'
import {useDispatch} from 'react-redux';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { newHotel } from '../../redux/Action/action';

export const formContext = React.createContext()

export default function NewService (){


  const [open, setOpen] = React.useState(false);
 

  let images = []

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

    const dispatch = useDispatch()

    const styles = {
      autocomplete: {
        width: '40%',
        marginBottom: '10px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
        },
        '& .MuiOutlinedInput-input': {
          color: '#000',
        },
        backgroundColor: 'white'
      },
      
    };

    const {register, formState: { errors }, watch, reset, control, setValue ,handleSubmit} = useForm(); 


    const seasons = [
        { value: 'Verano', label: 'Verano' },
        { value: 'Invierno', label: 'Invierno' },
        { value: 'Primavera', label: 'Primavera' },
        { value: 'Otoño', label: 'Otoño' }
      ]; 

      const locations = [
        'El Bolsón, Provincia de Río Negro',
        'Villa Pehuenia, Provincia de Neuquén',
        'Purmamarca, Provincia de Jujuy',
        'Villa Traful, Provincia de Neuquén',
        'Las Grutas, Provincia de Río Negro',
        'San Javier, Provincia de Tucumán',
        'Los Reartes, Provincia de Córdoba',
        'Caviahue, Provincia de Neuquén',
        'Tafí del Valle, Provincia de Tucumán',
        'Villa Meliquina, Provincia de Neuquén',
        'San Marcos Sierras, Provincia de Córdoba',
        'Cuesta Blanca, Provincia de Córdoba',
        'El Soberbio, Provincia de Misiones',
        'Villa General Roca, Provincia de Córdoba',
        'Colonia Suiza, Provincia de Río Negro',
        'San Antonio de los Cobres, Provincia de Salta',
        'Tilcara, Provincia de Jujuy',
        'El Condor, Provincia de Río Negro',
        'Villa Yacanto, Provincia de Córdoba',
        'Cholila, Provincia de Chubut',
        'Villa La Angostura, Provincia de Neuquén',
        'Santa Ana, Provincia de Misiones',
        'Las Rabonas, Provincia de Córdoba',
        'Yavi, Provincia de Jujuy',
        'Villa Ciudad Parque Los Reartes, Provincia de Córdoba',
        'Villa Cura Brochero, Provincia de Córdoba',
        'Villa Berna, Provincia de Córdoba',
        'Los Molles, Provincia de San Luis',
        'Los Alerces, Provincia de Chubut',
        'Nono, Provincia de Córdoba',
        'Lago Puelo, Provincia de Chubut',
        'La Cumbrecita, Provincia de Córdoba',
        'San Pedro de Colalao, Provincia de Tucumán',
        'Villa Lago Meliquina, Provincia de Neuquén',
        'Los Hornillos, Provincia de Córdoba',
        'Villa Quila Quina, Provincia de Neuquén',
        'Capilla del Monte, Provincia de Córdoba',
        'El Chocón, Provincia de Neuquén',
        'Maimará, Provincia de Jujuy',
        'Miramar, Provincia de Córdoba',
        'Villa Giardino, Provincia de Córdoba',
        'El Mollar, Provincia de Tucumán',
        'El Hoyo, Provincia de Chubut',
        'Yacanto de Calamuchita, Provincia de Córdoba',
        'Villa Ventana, Provincia de Buenos Aires',
        'San Roque, Provincia de Córdoba',
        'Villa de Las Rosas, Provincia de Córdoba',
        'El Maitén, Provincia de Chubut',
        'San José de la Dormida, Provincia de Córdoba',
        'Merlo, Provincia de San Luis',
        'Potrerillos, Provincia de Mendoza'
    ];

    
    const cloudinaryRef = React.useRef();
    const widgetRef = React.useRef();
    const paragraphRef = React.useRef();
    React.useEffect(() =>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "ds4blfuip",
            uploadPreset: "ml_default"
        }, function(error, result){
            if (!error && result && result.event === "success") {
                console.log("Imagen subida exitosamente:", result.info.secure_url);
                images.push(result.info.secure_url)  
                console.log('Estas son las url de las imagenes:', images) 
                setValue('images', images)
                paragraphRef.current.textContent = `Imágenes subidas: ${images?.length}`;
            } else {
                console.error("Error al subir la imagen:", error);
            }
        });       
    }, []);


    const onSubmit = (data) => {
        const seasonParser = data.season.map(item => item.value)
        const dataForSubmit  = {
            ...data,
            season: seasonParser
        }
        dispatch(newHotel(dataForSubmit))
        reset()
        images.splice(0, images.length);
        paragraphRef.current.textContent = `Imágenes subidas: ${images?.length}`
        console.log(images.length)
        Object.keys(data).forEach((fieldName) => {
          setValue(fieldName, null);
        });
        console.log(dataForSubmit)
        setOpen(true)
    };
    
    const handleKeyPressPr = (event) => {
        if (!/[0-9]/.test(event.key) || event.target.value.length >= 6) {
           event.preventDefault();
        }
       };

    const handleKeyPressRooms = (event) => {
        if (!/[0-9]/.test(event.key) || event.target.value.length >= 2) {
           event.preventDefault();
        }
       };
       
    const selectedSeasons = watch('season', []);

    const handleSeasonChange = (selectedOptions) => {
        setValue('season', selectedOptions); 
      };


    return(
      <div className="viewport">
        <div className="container">
        <h3>Formulario de alta de servicios</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="estaciones">
            <label>Estaciones del año</label><br/><br/>

            
            <Select
              isMulti
              options={seasons}
              {...register('season', { required: true })}
              value={selectedSeasons}
              onChange={handleSeasonChange}
              placeholder="Selecciona las estaciones"
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  color: 'black',
                  backgroundColor: 'white', 
                  border: '1px solid gray', 
                }),
                control: (provided, state) => ({
                  ...provided,
                  width: '100%',
                  backgroundColor: 'white', 
                  border: '1px solid gray', 
                }),
                menu: (provided, state) => ({
                  ...provided,
                  width: '100%',
                  backgroundColor: 'white', 
                  border: '1px solid gray', 
                })
              }}
            />
            
                       <br/>
            <br/>
            {errors.season?.type === 'required' && <p className="error">**Campo requerido**</p>}
            </div>
            <br/>
            <br/>
            <div className="titulo-publicacion">
              
            <label>Título de la publicación:</label>
            <br/>
            <br/>
           
            
            <input style={{ width: "200px", border: "1px 1px solid gray", backgroundColor: "white", height: "45px", marginTop: "-10px"}} type='text' {...register('name', { required: true, maxlength: 50 })}></input>
            
            {errors.name?.type === 'required' && <p className="error">Ingrese un título para su publicación</p>}
            <br></br>
            </div>

            <label>Localidad:</label>
            <br></br>
            <br/>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={locations}
                sx={{ width: 20 }}
                renderInput={(params) => <TextField {...params} label="Localidad" />}
                onChange={(event, newValue) => {
                setValue('location', newValue);
                }}    
                style={styles.autocomplete}            
                />
            <br></br> 
            
            <div className="price-nigth">

            <label>Precio por noche:</label>
            <br></br>
            <br/>
            <input style={{ border: "1px solid gray", backgroundColor: "white", height: "50px", marginTop: "-10px"}} type='number' onKeyPress={handleKeyPressPr} {...register('pricePerNight', { required: true })}></input>
            <br></br>
            {errors.pricePerNight?.type === 'required' && <p className="error">Ingrese un precio por noche para el hospedaje a publicar</p>}

            </div>


              <div className="bedroom">

            <label >Cantidad de habitaciones</label>
            <br></br>
            <br/>
            <input style={{ width: "200px", border: "1px solid gray", backgroundColor: "white", height: "50px", marginTop: "-10px"}} type='number' onKeyPress={handleKeyPressRooms}{...register('totalRooms', {required: true})}></input>
            <br></br>
            {errors.totalRooms?.type === 'required' && <p className="error">Ingrese la cantidad de habitaciones con las que cuenta el hospedaje a publicar</p>}
              </div>
            

            <div className="pool">
            <label className="pool-label">¿Posee piscina?</label>
            <div className="radio-container">
              <div className="radio-group">
                <label className="radio-option">
                  <span className="radio-text">Sí</span>
                  <input type="radio" className="radio-input" name="pool" value={true} {...register('pool', { required: true })} />
                </label>
                <label className="radio-option">
                  <span className="radio-text">No</span>
                  <input type="radio" className="radio-input" name="pool" value={false} {...register('pool', { required: true })} />
                </label>
              </div>
            </div>
            {errors.pool?.type === 'required' && <p className="error">Indique si el hospedaje a publicar cuenta con piscina</p>}
          </div>


            <div className="imagenes">

            <label>Agregue aquí imágenes sobre el hospedaje</label>   
            <br></br>
            <br></br>
            

            <button className="upload-button" onClick={(event) => {
              event.preventDefault()
              widgetRef.current.open()}}>
            Subir imágenes
            </button> 
              
            <br></br>
            <br></br>



            <p ref={paragraphRef} style={{marginLeft: '100px', color: 'white',font: "Arial"}} >Imágenes subidas: {images?.length}</p>
            <br></br>
            <br></br>
            </div>
            <button style={{marginTop: "200px", width: "500px"}} type='submit'>Publicar</button>
        </form>
        </div>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="¡El hospedaje ha sido creado exitosamente!"
        action={action}
        />
        </div>
    )
}