const { poolPromise, sql} = require('../configs/db');

exports.getAllEmployees = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.exat3');
    return result.recordset;
};

exports.createEmployee = async (employee) => {
    const { EMP_CODE, EMP_FNAME, EMP_LNAME, EMP_SEX, CREATE_BY, CREATE_DATE } = employee;
    const pool = await poolPromise;
    await pool.request()
        .input('EMP_CODE', sql.Int, EMP_CODE)
        .input('EMP_FNAME', sql.VarChar, EMP_FNAME)   
        .input('EMP_LNAME', sql.VarChar, EMP_LNAME)   
        .input('EMP_SEX', sql.VarChar, EMP_SEX)      
        .input('CREATE_BY', sql.VarChar, CREATE_BY)   
        .input('CREATE_DATE', sql.DateTime, CREATE_DATE)
        .query(`INSERT INTO Employees (EMP_CODE, EMP_FNAME, EMP_LNAME, EMP_SEX, CREATE_BY, CREATE_DATE)
                VALUES (@EMP_CODE, @EMP_FNAME, @EMP_LNAME, @EMP_SEX, @CREATE_BY, @CREATE_DATE)`);

};