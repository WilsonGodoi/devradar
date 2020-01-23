import React from 'react';
import api from '../services/api';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Grid from '@material-ui/core/Grid';

function DevItem({ devs, listDevs }) {

    async function deletarUsuario(github_username) {
        if (window.confirm('Realmente deseja remover o usuário?')) {
            await api.delete(`/dev/${github_username}`)
                .then((m) => listDevs())
                .catch(e => alert('Nao foi possível remover o usuário!')
                );
        }
    }

    return (
        <Grid container spacing={3}>
            {devs.map((dev) => (
                <Grid key={dev._id} item xs={12}>
                    <Card>
                        <CardContent>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt={dev.github_username} src={dev.avatar_url} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={dev.name}
                                    secondary={dev.techs.join(', ')}
                                />
                                <IconButton aria-label="delete" color="secondary" tooltip="fff" onClick={() => deletarUsuario(dev.github_username)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <div>{dev.bio}</div>
                            </ListItem>
                            <ListItem>
                                <div style={{ marginTop: '10px' }}>
                                    <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
                                </div>
                            </ListItem>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default DevItem;