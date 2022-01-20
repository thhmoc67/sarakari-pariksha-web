import React from 'react'
import LatestUpdates from '../../components/LatestUpdates'
import Notifications from '../../components/Notifications'
import ListCard from '../../components/ListCard'
import {tagsList} from '../../config/constants/tags'
import {examList, updateList} from './constants'

const Home = ({results, updates}: any) => {
  return (
    <div className="home-container ">
      <Notifications list={results?.notifications || []} />
      <LatestUpdates list={updates} />
      <div className="flex-row cards">
        <ListCard
          title="Admit Card"
          list={results?.admitcard}
          link="/admitcard"
        />
        <ListCard title="Result" list={results?.results} link="/results" />

        <ListCard
          title="Latest Jobs"
          list={results?.latestjobs}
          link="/latestjobs"
        />
        <ListCard
          title="Answer Key"
          list={results?.answerkey}
          link="/answerkey"
        />
        <ListCard title="Syllabus" list={results?.syllabus} link="/syllabus" />
        <ListCard
          title="Admission"
          list={results?.admission}
          link="/admission"
        />
      </div>
    </div>
  )
}

export default Home
