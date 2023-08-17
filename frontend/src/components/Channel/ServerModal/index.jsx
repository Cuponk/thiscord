import './ServerModal.css'
import * as serverActions from '../../../store/server';
import * as sessionActions from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';

const ServerModal = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState('');
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(sessionActions.restoreSession());
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault();
        
        dispatch(serverActions.createServer({server: {name: serverName, owner_id: sessionUser.id}}))

        setShowModal(false);
    }

    return (
        <>
            {showModal && (
                <div className='server-modal' onClick={() => setShowModal(false)}>
                    <div className='server-modal-content' onClick={e => e.stopPropagation()}>
                        <div className='server-modal-header'>
                            <h2 className='top-half'>Customize Your Server</h2>
                            <h1 className='close top-half' onClick={() => setShowModal(false)}>X</h1>
                            <p>Give your new server a personality with a name and an icon, you can always change it later</p>
                        </div>
                        <div className='server-modal-body'>
                            <form onSubmit={handleSubmit}>
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