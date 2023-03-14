import "./tableHeader.css"
function TableHeader({columns}) {
  return (
    <thead className="table--header">
      <tr>
        {columns.map((column,index)=>{
          return <th key={index}>{column}</th>
        })}
        <th>Action</th>
        
      </tr>
    </thead>
  );
}
export default TableHeader