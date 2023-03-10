import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import './teamRow.css';

function TeamRow(props) {
    let members = props.team.employees.length
    let projects = props.team.projects.length
  return (
    <tr>
      <td>{props.team.name}</td>
      <td>{projects}</td>
      <td>{members}</td>
      <td>
        <FaEye className="action-icon view-icon" title="View Team" />
        <FaEdit className="action-icon edit-icon" title="Edit Team" />
        <FaTrash className="action-icon delete-icon" title="Delete Team" />
      </td>
    </tr>
  );
}

export default TeamRow;
