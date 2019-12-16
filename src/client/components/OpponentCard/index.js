import React from "react";


export default (props) => (
    <>
        <h1 className="text-3xl mb-5 text-center">Your Opponent</h1>
        <h1 className="text-2xl mb-5 text-center text-blue-700">{props.status}</h1>
        <div class="flex mb-4">
            <div class="w-full lg:w-1/3"><h3 className="text-xl text-center">Name: <span className="text-orange-500">{props.name}</span></h3></div>
            <div class="w-full lg:w-1/3"><h3 className="text-xl text-center">Current Level: <span className="text-orange-500">{props.currentLevel + 1}</span></h3></div>
            <div class="w-full lg:w-1/3"><h3 className="text-xl text-center">Progress: <span className="text-orange-500">{props.matchCount}%</span></h3></div>
        </div>
    </>
);