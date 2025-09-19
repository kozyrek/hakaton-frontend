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
                const response = await getTeamById(teamId);
                setTeam(response);
                console.log(response)
                setMembers(response.teamMembers);
            } catch (e) {
                setError(e.message)
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
                    const requestProject = await getProjectById(team.projectId);
                    setProject(requestProject.data);
                } catch (e) {
                    setError(e.message);
                }
            }
            console.log(project);//---
            fetchTeamProject();
        }
    // eslint-disable-next-line
    }, [team.projectId])

    return (
 <>
    <LayoutLogin>
      <Container fluid="xxl">
        <HeadTeam team={team} />     
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
      <TeamProject project={project} />
    </Container>
  </>
    )
}