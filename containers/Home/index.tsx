import React from 'react'
import LatestUpdates from '../../components/LatestUpdates'
import ListCard from '../../components/ListCard'
import {examList, updateList} from './constants'

const Home = () => {
  return (
    <div className="home-container ">
      <LatestUpdates list={updateList} />
      <div className="flex-row cards">
        <ListCard title="Result" list={examList} link="/results" />
        <ListCard title="Result" list={examList} link="/results" />
        <ListCard title="Result" list={examList} link="/results" />
        <ListCard title="Result" list={examList} link="/results" />
        <ListCard title="Result" list={examList} link="/results" />
        <ListCard title="Result" list={examList} link="/results" />
      </div>
    </div>
  )
}

export default Home
