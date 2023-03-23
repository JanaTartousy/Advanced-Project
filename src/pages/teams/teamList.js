import Row from "./teamRow/teamRow";

function TeamList({ rows ,onDelete,onEdit}) {

    return (
      <tbody style={{ backgroundColor: "#f4f9fc"}}>
        {rows.map((row, index) => (
          <Row key={index} team={row} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    );
  }
  
  export default TeamList