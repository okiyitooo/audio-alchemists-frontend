import React, { useEffect } from 'react';
import ProjectView from '../components/ProjectView';
import { useParams } from 'react-router-dom';
import { CircularProgress, Container } from '@mui/material';
import VersionHistoryList from '../components/VersionHistoryList';
import { connect } from 'react-redux';
import { getProject } from '../redux/actions/projectActions';

function ProjectPage({ project, loading, error, getProject}) {
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getProject(id);
        }
    }, [id, getProject]);

    if (loading) {
        return (<Container maxWidth="md" sx = {{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress size={20} sx = {{ color: '#1976d2' }} />
        </Container>)
    }

    if (error) {
        return (<Container maxWidth="md" sx = {{ color: 'red', mt: 4 }}>
            <div>Error loading project: {error}</div>
        </Container>)
    }

    if (!project) {
        return (
            <Container maxWidth="md" sx = {{ mt: 4 }}>
                <div>Where data?</div>
            </Container>
        )
    }
    return (
        <Container maxWidth="md">
            <ProjectView project={project} />
            <VersionHistoryList projectId={id} />
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        project: state.project.project,
        loading: state.project.loading,
        error: state.project.error,
    };
}

const mapDispatchToProps = ({
    getProject
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);