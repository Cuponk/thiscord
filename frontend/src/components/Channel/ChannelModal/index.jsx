import './ChannelModal.css'
import * as channelActions from '../../../store/channel';
import * as sessionActions from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { ReactComponent as CloseButton } from '../../../assets/close.svg'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as Hashtag } from '../../../assets/hashtag.svg'

const ChannelModal = ({showChannelModal, setShowChannelModal}) => {
    const [channelName, setChannelName] = useState('');
    const history = useHistory();
    const {serverId} = useParams()
    const dispatch = useDispatch();
    const channelId = useSelector(state => state.channels[serverId]?.[0]?.id)

    useEffect(() => {
        dispatch(sessionActions.restoreSession());
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            name: channelName
        }
        dispatch(channelActions.createChannel(payload, serverId));
        setShowChannelModal(false);
        history.push(`/channels/${serverId}/${channelId}`)
    }

    return (
        <div className='modal-base'>
            {showChannelModal && (
                <div className='channel-modal' onClick={() => setShowChannelModal(false)}>
                    <div className='channel-modal-content' onClick={e => e.stopPropagation()}>
                        <div className='channel-modal-header'>
                            <h2 className='modal-title'>Create Channel</h2>
                            <CloseButton className='close' onClick={() => setShowChannelModal(false)}/>
                        </div>
                        <div className='channel-modal-body'>
                            <form className='modal-form' onSubmit={handleSubmit}>
                                <div className="channel-name-base">
                                    <label className='channel-form-name'>CHANNEL NAME</label>
                                    <input
                                        className='channel-name-input'
                                        type='text'
                                        placeholder='#channel-name'
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                    />
                                </div>
                                <div className="bottom-submit">
                                    <button className='submit-button' type='submit'>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                )}
        </div>           
    )
}

export default ChannelModal;