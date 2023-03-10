import TeamList from "./teamList";
import TeamTableHeader from "./teamTableHeader";

function TeamTable({ teams }) {
    return (
      <table className="team-table">
        <TeamTableHeader />
        <TeamList teams={teams} />
      </table>
    );
  }


  export default TeamTable
  