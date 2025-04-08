import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, CircularProgress, Alert, Avatar, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchUserRecommendations } from '../redux/actions/recommendationActions';
import { followUser, unfollowUser } from '../redux/actions/followActions'; 

function RecommendedUsers() {
    const dispatch = useDispatch();
    const { userRecs, userRecsLoading, userRecsError } = useSelector((state) => state.recommendations);
    const { user: currentUser } = useSelector((state) => state.user);
    // 'followingInProgress' is managed by a combined reducer under 'follow' key
    const { followingInProgress } = useSelector((state) => state.follow);

    useEffect(() => {
        if (currentUser)
            dispatch(fetchUserRecommendations());
    }, [dispatch, currentUser]);

    const handleFollowToggle = (userIdToToggle) => {
        if (!currentUser) return; // Must be logged in

        const isCurrentlyFollowing = currentUser.following?.includes(userIdToToggle);

        if (isCurrentlyFollowing) {
            dispatch(unfollowUser(userIdToToggle));
        } else {
            dispatch(followUser(userIdToToggle));
        }
    };

    if (userRecsLoading) {
        return <CircularProgress size={20} />;
    }

    if (userRecsError) {
        return <Alert severity="warning" variant="outlined" sx={{ mt: 1 }}>Could not load user recommendations.</Alert>;
    }

    if (!currentUser)
        return null;
    if (!userRecs || userRecs.length === 0) {
        return (
            <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6" gutterBottom>No User Recommendations</Typography>
                <Typography variant="body2">Follow more users to get better recommendations.</Typography>
            </Paper>
        )
    }

    return (
         <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>Suggested Users</Typography>
            <List dense>
                {userRecs.map((user) => {
                    // Determine follow status - This is a simplified check.
                    const isFollowing = currentUser.following?.includes(user.id);
                    const isLoading = followingInProgress[user.id]; // Check loading state for this specific user

                    if (currentUser.id === user.id) return null; // Don't show self in recommendations
                    return (
                        <ListItem
                            key={user.id}
                            divider
                            secondaryAction={
                                <Button
                                    size="small"
                                    variant={isFollowing ? "outlined" : "contained"} // Change appearance based on state
                                    onClick={() => handleFollowToggle(user.id, isFollowing)}
                                    disabled={isLoading} // Disable while action is in progress
                                >
                                    {isLoading ? <CircularProgress size={16} /> : (isFollowing ? 'Unfollow' : 'Follow')}
                                </Button>
                            }
                        >
                            <Avatar sx={{ mr: 1, bgcolor: 'secondary.main', width: 32, height: 32 }}>{user.username.charAt(0).toUpperCase()}</Avatar>
                            <ListItemText
                                primary={<Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{user.username}</Link>}
                                secondary={user.reason || 'Might be interesting'}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default RecommendedUsers;