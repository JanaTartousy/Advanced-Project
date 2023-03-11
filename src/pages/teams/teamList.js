import TeamRow from "./teamRow";

function TeamList({ teams ,onDelete,onEdit}) {
    return (
      <tbody>
        {teams.map((team, index) => (
          <TeamRow key={index} team={team} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    );
  }
  
  export default TeamList