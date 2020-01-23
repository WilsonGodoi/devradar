import React, { useState, useEffect } from 'react';
import api from '../services/api';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

function DevForm({ listDevs }) {
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithub_username] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => { console.log(error) },
            { timeout: 30000 }
        );
    }, []);

    async function cadastrarDev(e) {
        e.preventDefault();
        setLoading(true);
        await api.post('/devs', {
            github_username,
            techs,
            latitude,
            longitude
        });
        setGithub_username('');
        setTechs('');
        listDevs();
        setLoading(false);
    }


    return (
        <Card>
            <form onSubmit={cadastrarDev}>
                <CardContent>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#3f51b5' }}>Cadastrar</h2>
                    </div>
                    <TextField
                        style={{ width: '100%', paddingBottom: '1em' }}
                        label="Usuário do Github"
                        type="text"
                        value={github_username}
                        onChange={e => setGithub_username(e.target.value)}
                        required
                    />
                    <TextField
                        style={{ width: '100%', paddingBottom: '1em' }}
                        label="Tecnologias"
                        type="text"
                        value={techs}
                        onChange={e => setTechs(e.target.value)}
                        required />
                    <TextField
                        style={{ width: '100%', paddingBottom: '1em' }}
                        label="Latitude"
                        type="number"
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        required
                    />
                    <TextField
                        style={{ width: '100%', paddingBottom: '1em' }}
                        label="Longitude"
                        type="number"
                        id="longitude"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        required
                    />
                </CardContent>
                {
                    loading ?
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </div> :
                        <CardActions>
                            <Button disabled={false} type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                Salvar</Button>
                        </CardActions>
                }
            </form>
        </Card>
    );
}

export default DevForm;