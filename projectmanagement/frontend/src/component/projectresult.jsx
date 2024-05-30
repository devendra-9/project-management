export default function projectresult({project})
{
  return (
    <div className='dispalyresult'>
        <div className="displayhead">
            <div className="displaydesc">
            <h1>{project.projecttopic}</h1>
            <p>Status : <strong>{project.projectstatus}</strong></p>
            </div>
            <a href={`/project/${project._id}`}><button> View</button></a>
        </div>
    </div>
  )
}