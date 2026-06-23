const ArrayProp = ({ fruits }) => {
    return (
        <div>

                    <ol>
                        {
                            fruits.map((value, index) => <li key={index}>{value}</li>)
                        }
                    </ol>

            <h1>{fruits.join(",")}</h1>

        </div>
    );
};

export default ArrayProp;
