/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { getReaderFollows } from 'state/selectors';

/**
 * Internal Dependencies
 */
import ReaderImportButton from 'blocks/reader-import-button';
import ReaderExportButton from 'blocks/reader-export-button';
import SitesWindowScroller from './sites-window-scroller';
import QueryReaderFollows from 'components/data/query-reader-follows';
import FollowingManageSearchFollowed from './search-followed';
import { getFeed as getReaderFeed } from 'state/reader/feeds/selectors';
import { getSite as getReaderSite } from 'state/reader/sites/selectors';

class FollowingManageSubscriptions extends Component {
	static propTypes = {
		follows: PropTypes.array.isRequired,
		sites: PropTypes.array.isRequired,
		feeds: PropTypes.array.isRequired,
	}

	getState = ( props = this.props ) => {
		if ( props.search ) {
			newState.subscriptions = this.searchSubscriptions( newState.subscriptions, props.search );
		}

		// if ( this.state && this.state.sortOrder ) {
		// 	newState.subscriptions = this.sortSubscriptions( newState.subscriptions, this.state.sortOrder );
		// }

		return newState;
	}

	searchSubscriptions( subscriptions/*, phrase*/ ) {
		return subscriptions;

		// @todo need the site and feed here, and change from immutable.js syntax
		//
		// return subscriptions.filter( function( item ) {
		// 	const feed = null; // todo grab feed and site for current sub
		// 	const site = null;
		// 	const phraseRe = new RegExp( escapeRegexp( phrase ), 'i' );

		// 	// return item.get( 'URL' ).search( phraseRe ) !== -1 ||
		// 	// 	( site && ( site.get( 'name' ) || '' ).search( phraseRe ) !== -1 ) ||
		// 	// 	( site && ( site.get( 'URL' ) || '' ).search( phraseRe ) !== -1 ) ||
		// 	// 	( feed && ( feed.name || '' ).search( phraseRe ) !== -1 ) ||
		// 	// 	( feed && ( feed.URL || '' ).search( phraseRe ) !== -1 ) ||
		// 	// 	( feed && ( feed.feed_URL || '' ).search( phraseRe ) !== -1 );
		// }, this );
	}

	render() {
		const { follows, width, translate } = this.props;

		return (
			<div className="following-manage__subscriptions">
				<QueryReaderFollows />
				<div className="following-manage__subscriptions-controls">
					{
						translate( '%(num)s Followed Sites', {
							args: { num: follows.length }
						} )
					}
					<ReaderImportButton />
					<ReaderExportButton />
					<FollowingManageSearchFollowed />
				</div>
				<div className="following-manage__subscriptions-list">
					{ follows &&
						<SitesWindowScroller
							sites={ follows }
							width={ width } />
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const follows = getReaderFollows( state );
	const getFeed = feedId => getReaderFeed( state, feedId );
	const getSite = siteId => getReaderSite( state, siteId );

	return { follows, getFeed, getSite };
};

export default connect(
	mapStateToProps,
)( localize( FollowingManageSubscriptions ) );
