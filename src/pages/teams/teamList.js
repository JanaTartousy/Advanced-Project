import Row from "./teamRow/teamRow";

function TeamList({ rows ,onDelete,onEdit}) {

    return (
      <tbody>
        {rows.map((row, index) => (
          <Row key={index} team={row} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    );
  }
  
  export default TeamList