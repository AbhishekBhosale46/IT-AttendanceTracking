import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import Select from 'react-select'
import { CSVLink } from 'react-csv'

const Form = () => {

  const BASE_URL = `http://localhost:1337/api/students`
  const {user} = useAuthContext()
  const [divisions, setDivisions] = useState()
  const [subjects, setSubjects] = useState()
  const [year, setYear] = useState(null)
  const [divi, setDivi] = useState(null)
  const [sub, setSub] = useState(null)
  const [rolls, setRolls] = useState()
  const [date, setDate] = useState('')
  const [absentData, setAbsentData] = useState()
  const [headers, setHeaders] = useState(null)
  const [selectRolls, setSelectedRolls] = useState([])

  const rollNumbs = [
    {value: 1, label:'1'},
    {value: 2, label:'2'},
    {value: 3, label:'3'}
  ]
  
  //HANDLE THE MULTISELCT
  const handleRollChange = (e) => {
    setSelectedRolls(Array.isArray(e) ? e.map(o => o.value) : [])
  }

  //MARKS THE ATTENDANCE
  const handleMark = async (e) => {
    e.preventDefault()

    try{
      let response = await axios.get(BASE_URL+`?filters[year][$eq]=${year}&filters[division][$eq]=${divi}`, {headers})
      const totalStudents = response.data.meta.pagination.total

      for(let i=0; i<totalStudents; i++){

        //Fetch student with particular id
        const student = await axios.get(BASE_URL+`/${response.data.data[i].id}?populate=${sub}`, {headers})
        console.log(`Roll is : ${student.data.data.attributes.roll}`)

        //Mark false if absent and true if present
        if(selectRolls.includes(student.data.data.attributes.roll)){
          const data = student.data.data.attributes[sub]
          data.push({date: date, present: 'false'})
          const res = await axios.put(BASE_URL+`/${response.data.data[i].id}?populate=${sub}`,{
            "data": {
              [sub]: data
            }
          }, {headers})
          console.log('absent')
        }else{
          const data = student.data.data.attributes[sub]
          data.push({date: date, present: 'true'})
          const res = await axios.put(BASE_URL+`/${response.data.data[i].id}?populate=${sub}`,{
            "data": {
              [sub]: data
            }
          }, {headers})
          console.log('present')
        }

      }
      
      setAbsentData(null)

    }catch(err){
      console.log(err)
    }
    
  }
 

  //FETCH STUDENTS DETAILS
  const handleGet = async (e) => {

    const arr = []
    for(let i=0; i<selectRolls.length; i++){
      const response = await axios.get(BASE_URL+`?filters[year][$eq]=${year}&filters[division][$eq]=${divi}&filters[roll][$eq]=${selectRolls[i]}&fields=name,roll`, {headers})
      const data = arr
      // console.log((response.data.data)[0].attributes)
      data.push({name: (response.data.data)[0].attributes.name, roll: ''+(response.data.data)[0].attributes.roll})
    }
    setAbsentData(arr)

  }


  //HANDLE THE CSV DOWNLOAD
  const handleDownload = async (e) => {
    let response = await axios.get(BASE_URL+`?filters[year][$eq]=${year}&filters[division][$eq]=${divi}`, {headers})
    console.log(response.data.data[0].attributes.name)

    const csvHeaders = [
      {label: "Name", key: "attributes.name"}
    ]

  }

  handleDownload()

  //FETCH PROFESSOR DETAILS FROM LOCAL STORAGE
  useEffect(() => {
    if(user){
      setYear((user.user.year).split(','))
      setDivisions((user.user.division).split(','))
      setSubjects((user.user.subject).split(','))
      setDivi(((user.user.division).split(','))[0])
      setSub(((user.user.subject).split(','))[0])
      setHeaders({ Authorization: `Bearer ${user.jwt}` })
      console.log('useEffect ran')
    }
  }, [])


  //HTML TO RENDER
  return (
    <div className='create'>
        <form>

            <label>Select Year : </label>
            <select>
                {year && year.map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            <label>Select Class : </label>
            {divisions && 
            <select onChange={(e) => setDivi(e.target.value)}>
                {divisions && divisions.map(d => <option key={d} value={d} >{d}</option>)}
            </select>
            }

            <label>Select Subject : </label>
            {subjects && 
            <select onChange={(e) => setSub(e.target.value)}>
                {subjects && subjects.map(s => <option key={s} value={s} >{s}</option>)}
            </select>
            }

            <label>Select Date : </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>

            <label>Absent Roll : </label>
            {/* <input type="text" onChange={(e) => setRolls((e.target.value).split(" "))}/> */}

            <div className='select'>
              <Select
              isMulti
              isClearable
              value={rollNumbs.filter(obj => selectRolls.includes(obj.value))}
              options={rollNumbs}
              onChange={handleRollChange}
              />
            </div>

        </form>

        {/* Html to display data in table */ }
        {absentData && 
          <div className='Table'>
            <table>
              <tr>
                <th>Name</th>
                <th>Roll</th>
              </tr>
              {
                absentData.map((val,key) => {
                  return(
                    <tr key={key}>
                      <td>{val.name}</td>
                      <td>{val.roll}</td>
                    </tr>
                  )
                })
              }
            </table>
          </div>
        }

        {/* <div>{selectRolls}</div> */}

        <button onClick={handleGet}>Get Details</button>
        <button onClick={handleMark}>Mark Attendance</button>
        <button>Download Attendance</button>
    </div>
  )
}

export default Form