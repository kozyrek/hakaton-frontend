import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import LayoutLogin from "../auth/layoutLogin";
import getTeamById from "../../api/team/getTeamById";
import getProjectById from "../../api/projects/getProjectById";
import HeadTeam from "../team-page/head-team/headTeam";
import TeamMembers from "./team-members/teamMembers";
import TeamProject from "./team-project/teamProject";

export default function TeamPage() {
    const { teamId } = useParams();
    const [team, setTeam] = useState({});
    const [project, setProject] = useState(null);
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const fetchTeamInfo = async () => {
            try {
                console.log('Fetching team with ID:', teamId); // Добавлено для отладки
                const response = await getTeamById(teamId);
                setTeam(response);
                console.log('Team data:', response); // Добавлено для отладки
                setMembers(response.teamMembers);
            } catch (e) {
                console.error('Error fetching team:', e.message); // Добавлено для отладки
                setError(e.message);
            }
        }
        fetchTeamInfo();
        console.log("mount", teamId);
    // eslint-disable-next-line
    }, [teamId]);
    
    useEffect(() => {
        if (team.projectId) {
            const fetchTeamProject = async () => {
                try {
                    console.log('Fetching project for team, projectId:', team.projectId); // Добавлено для отладки
                    const requestProject = await getProjectById(team.projectId);
                    setProject(requestProject.data);
                } catch (e) {
                    console.error('Error fetching team project:', e.message); // Добавлено для отладки
                    setError(e.message);
                }
            }
            fetchTeamProject();
        } else {
            console.log('No projectId found in team data'); // Добавлено для отладки
            setProject(null);
        }
    // eslint-disable-next-line
    }, [team.projectId])

    useEffect(() => {
    const fetchTeamInfo = async () => {
        try {
            const response = await getTeamById(teamId);
            console.log('=== ДАННЫЕ КОМАНДЫ ===');
            console.log('Team ID:', teamId);
            console.log('Team name:', response.name);
            console.log('Team projectId:', response.projectId); // ← ЭТО КРИТИЧЕСКИ ВАЖНО!
            console.log('====================');
            
            setTeam(response);
            setMembers(response.teamMembers);
        } catch (e) {
            setError(e.message)
        }
    }
    fetchTeamInfo();
}, [teamId]);

const handleTeamUpdate = async () => {
  // Перезагрузите данные команды
  const updatedTeam = await getTeamById(teamId);
  setTeam(updatedTeam);
};

    // ДОБАВЛЕНО: Обработка случая, когда данные не найдены
    if (error) {
        return (
            <LayoutLogin>
                <Container fluid="xxl">
                    <div style={{ 
                        padding: '2rem', 
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        margin: '2rem 0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        position: 'relative',
                        zIndex: 10
                    }}>
                        <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>
                            Ошибка загрузки данных
                        </h2>
                        {/* <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                            {error}
                        </p>
                        <p style={{ color: '#666' }}>
                            Team ID: {teamId}
                            {team.projectId && ` | Project ID: ${team.projectId}`}
                        </p> */}
                        <button 
                            onClick={() => window.history.back()}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#1976d2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Вернуться назад
                        </button>
                    </div>
                </Container>
            </LayoutLogin>
        );
    }

    return (
        <>
            <LayoutLogin>
                <Container fluid="xxl">
                    <HeadTeam team={team} onTeamUpdate={handleTeamUpdate}/>     
                </Container>      
            </LayoutLogin>

            <Container fluid="xxl">
                <TeamMembers 
                    members={members} 
                    onTeamUpdate={(teamData) => {
                        setTeam(teamData);
                        setMembers(teamData.teamMembers);
                    }} 
                />
                <TeamProject 
                    project={project} 
                    teamId={teamId}
                    onTeamUpdate={(teamData) => {
                        setTeam(teamData);
                        setMembers(teamData.teamMembers);
                        
                        // Если у команды есть projectId, загружаем проект
                        if (teamData.projectId) {
                            const fetchTeamProject = async () => {
                                try {
                                    const requestProject = await getProjectById(teamData.projectId);
                                    setProject(requestProject.data);
                                } catch (e) {
                                    setError(e.message);
                                }
                            }
                            fetchTeamProject();
                        } else {
                            setProject(null);
                        }
                    }} 
                />
            </Container>
        </>
    )
}