import TeamRow from "./teamRow";

function TeamList({ teams }) {
    return (
      <tbody>
        {teams.map((team, index) => (
          <TeamRow key={index} team={team} />
        ))}
      </tbody>
    );
  }
  
  export default TeamList