import Row from "./../EvaluationRow/evaluationRow";

function EvaluationList({ rows,onDelete,onEdit}) {

    return (
      <tbody>
        {rows.map((row, index) => (
          <Row key={index} evaluations={row} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    );
  }
  
  export default EvaluationList