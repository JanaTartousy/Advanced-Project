import TeamList from "./teamList";
import TeamTableHeader from "./teamTableHeader";

function TeamTable({ teams, onDelete ,onEdit}) {
  
    return (
      <table className="team-table">
        <TeamTableHeader />
        <TeamList teams={teams} onDelete={onDelete} onEdit={onEdit} />
      </table>
    );
  }


  export default TeamTable
  