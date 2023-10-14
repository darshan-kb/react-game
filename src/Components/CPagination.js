
const CPagination = ({totalPages, paginate}) =>{
    let pages = [];
    for(let i=1;i<=totalPages;i++){
        pages.push(i);
    }

    console.log(totalPages)

    return (
        <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center"}}>
        <nav >
            <ul className="pagination">
                {
                    pages.map((number) =>(
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number-1)} href="#!" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
        </div>
    )
}

export default CPagination;