import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { navigate } from './utils/constants'

class Toolbar extends React.Component {
  render() {
    let { label } = this.props

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          {/* <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button> */}
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
            className="ui mini default round button"
          >
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
            className="ui mini default round button"
          >
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </span>

        <span className="rbc-toolbar-label">{label}</span>

        {/* <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span> */}
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={clsx({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
