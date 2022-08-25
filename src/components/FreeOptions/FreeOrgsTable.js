import React from 'react';
import { render } from 'react-dom';
import './freeOrgsTable.css';
import * as freeOrgs from "../Files/freeOrgs.json";
import * as FaIcons from "react-icons/fa";

const freeOrgData = freeOrgs
const orgData = freeOrgData.features

const mapPickup = (location)=> {
    return(
        <small>
            <p><strong>{location.name}</strong><br/>
                Address: {location.address}<br/>
                Hours: {location.hours}<br/>
                Instructions: {location.instructions}</p>
        </small>
    );
}

class UserTableRow extends React.Component {
  state = { expanded: false }

  toggleExpander = (e) => {

    if (!this.state.expanded) {
      this.setState(
        { expanded: true }
      );
    } else {
        this.setState({ expanded: false })
      }
    }

  render() {
    const { user } = this.props;
    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td><FaIcons.FaPlusCircle color = "purple"/></td>
        <td className='info'>{user.email}</td>
        <td className='info'>{user.services}</td>
        <td className='info'>{user.pickup == "Yes" ? <FaIcons.FaCheck color = "green"/>: <FaIcons.FaMinusCircle color = "red"/>}</td>
        <td className='info'>{user.delivery == "Yes" ? <FaIcons.FaCheck color = "green"/>: <FaIcons.FaMinusCircle color = "red"/>} </td>
        <td className='info'>{user.time}</td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
              <div className="uk-width-1-4 uk-text-center">
                <h1>{user.email}</h1>
              </div>
              <div className="uk-width-3-4">
                <h4>How do I ask for EC?</h4>
                <p>{user.contact}</p>
                <h4>What should I expect?</h4>
                <p>{user.details}</p>
                {user.pickup_locations ? (<p><h4>Pickup Locations</h4>{
                    user.pickup_locations.map((location) => {
                        return mapPickup(location);
                    })
                    }</p>) : <br/>}    
                <p>
                  Website: {user.website}<br/>
                  {user.instagram !== "None" ? <p>Instagram: {user.instagram}</p> : <br/>}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )
    ];
  }
}

class FreeOrgsTable extends React.Component {
  state = { users: null }

  componentDidMount() {
    this.setState({users: orgData});
  }


  render() {
    const { users } = this.state;
    const isLoading = users === null;
    return (
      <main>
        <header>
            <div>
                <h1>Organizations that Provide Free Emergency Contraceptive Across Texas</h1>
                <p className='subtitle'>The following organizations offer <strong>FREE</strong> emergency contraceptives across Texas.
                </p>
            </div>
        </header>
        <div className="table-container">
            <table className="table-container">
              <thead>
                <tr>
                    <th><FaIcons.FaPlusCircle color = "purple"/></th>
                  <th>Organization</th>
                  <th>Provides Free EC to</th>
                  <th>Offers pickup?</th>
                  <th>Offers delivery?</th>
                  <th>Ready in</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                  : users.map((user, index) =>
                      <UserTableRow key={index} index={index + 1} user={user}/>
                    )
                }
              </tbody>
            </table>
          </div>
      </main>
    );
  }
}

export default FreeOrgsTable;
