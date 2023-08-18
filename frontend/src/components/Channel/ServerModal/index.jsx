import './ServerModal.css'
import * as serverActions from '../../../store/server';
import * as sessionActions from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import {ReactComponent as UploadImage} from '../../../assets/upload.svg';

const ServerModal = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState('');
    const [serverPhoto, setServerPhoto] = useState(null);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(sessionActions.restoreSession());
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('server[name]', serverName);
        formData.append('server[owner_id]', sessionUser.id);
        if (serverPhoto) formData.append('server[photo]', serverPhoto);
        // console.log(formData);
        dispatch(serverActions.createServer(formData))
        setShowModal(false);
    }

    const handlefile = e => {
        const file = e.target.files[0];
        if (file) setServerPhoto(file);
    }

    return (
        <>
            {showModal && (
                <div className='server-modal' onClick={() => setShowModal(false)}>
                    <div className='server-modal-content' onClick={e => e.stopPropagation()}>
                        <div className='server-modal-header'>
                            <div className="top-half">
                                <h2 className='modal-title'>Customize Your Server</h2>
                                <h1 className='close' onClick={() => setShowModal(false)}>x</h1>
                            </div>
                            <p className='modal-text'>Give your new server a personality with a name and an icon, you can always change it later</p>
                        </div>
                        <div className='server-modal-body'>
                            <form className='modal-form' onSubmit={handleSubmit}>
                                <UploadImage className='upload-image'/>
                                <label>
                                    <input type="file" onChange={handlefile} />
                                </label>
                                <label>SERVER NAME</label>
                                <input
                                    type='text'
                                    value={serverName}
                                    onChange={(e) => setServerName(e.target.value)}
                                />
                                <button type='submit'>Create</button>
                            </form>
                        </div>
                    </div>
                </div>)
            }
        </>           
    )
}

export default ServerModal;