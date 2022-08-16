import { useEffect } from 'react';
import InputTextForm from './InputTextForm';
import { useForm } from 'react-hook-form';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function CreateModalForm({ isOpen, handleClose, title, fields, data, onSubmit, size })
{
    const { control, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if ( fields && Array.isArray(fields) && fields.length > 0 && data && typeof data === 'object' && Object.keys(data).length > 0 ) {
            fields.map(( field ) => {
                setValue(field.name, data[field.name]);
            });
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
                            const { type } = field;

                            switch (type) {
                                case 'text':
                                    return (
                                        <InputTextForm
                                            key={index}
                                            name={field.name}
                                            value={(data && data[field.name]) ? data[field.name] : ''}
                                            control={control}
                                            placeholder={(field.placeholder !== undefined) ? field.placeholder : 'Ingrese valor'}
                                        />
                                    );
                            }
                        }))
                    }
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </ModalFooter>
            </form>
        </Modal>
    );
}