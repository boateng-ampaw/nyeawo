export default function PageHeader({title=''}){
    return (
        <section className="bg-light border-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 offset-md-3">
                        <div className="py-3 py-lg-5">
                            <h1 className="mb-0 py-3 secondary-font nyeawo-red-text" dangerouslySetInnerHTML={{__html: title.length ? title : 'All Products' }}></h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}