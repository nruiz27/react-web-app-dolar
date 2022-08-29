import { useEffect } from 'react';
import InputTextForm from './InputTextForm';
import { useForm } from 'react-hook-form';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Info from '../Info';

export default function CreateModalForm({ isOpen, handleClose, title, fields, data, onSubmit, size })
{
    const { control, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if ( fields && Array.isArray(fields) && fields.length > 0 && data && typeof data === 'object' && Object.keys(data).length > 0 ) {
            for (const field of fields) {
                setValue(field.name, data[field.name]);
            }
        }
    }, [data]);

    return (
        <Modal isOpen={isOpen} className={size !== undefined ? `modal-${size}` : 'modal-lg'} toggle={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={handleClose}>{title}</ModalHeader>
                <ModalBody>
                    {
                        (fields && fields.length) && (fields.map((field, index) => 
                        {
                            return (
                                <div className="mb-3" key={index}>
                                      <label htmlFor={field.name} className="form-label">{field.label}</label>
                                      {
                                        (() => {
                                            const { type } = field;
                                            switch (type) {
                                                case 'text':
                                                    return (
                                                        <InputTextForm
                                                            name={field.name}
                                                            value={(data && data[field.name]) ? data[field.name] : ''}
                                                            control={control}
                                                            placeholder={`Ingrese ${field.label.toLowerCase()}`}
                                                        />
                                                    );
                                                default: 
                                                    return (
                                                        <span>Default component</span>  
                                                    );
                                            }
                                        })()
                                      }
                                      {
                                        field.info && (
                                            <Info text={field.info}/>
                                        )
                                      }
                                </div>
                            )
                        }))
                    }
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary btn-custom">Guardar</button>
                    <button type="button" className="btn btn-outline-secondary btn-custom" onClick={handleClose}>Cerrar</button>
                </ModalFooter>
            </form>
        </Modal>
    );
}