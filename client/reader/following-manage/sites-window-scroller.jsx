/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, WindowScroller } from 'react-virtualized';

/**
 * Internal Dependencies
 */
import ConnectedSubscriptionListItem from './connected-subscription-list-item';
import { getFeed as getReaderFeed } from 'state/reader/feeds/selectors';
import { getSite as getReaderSite } from 'state/reader/sites/selectors';
import { getSiteDescription } from 'reader/get-helpers';

/**
 * SitesWindowScroller is a component that takes in a list of site/feed objects.
 * It renders a list of the sites/feeds.
 *
 * @returns {object} SitesWindowScroller React Component
 */
class SitesWindowScroller extends Component {
	static propTypes = {
		sites: PropTypes.array.isRequired,
	};

	siteRowRenderer = ( { index, key, style } ) => {
		const site = this.props.sites[ index ];

		return (
			<div key={ key } style={ style }>
					<ConnectedSubscriptionListItem
						url={ +site.URL }
						feedId={ +site.feed_ID }
						siteId={ +site.blog_ID }
					/>
			</div>
		);
	};

	getRowHeight = ( { index } ) => {
		const { getFeed, getSite, sites } = this.props;
		const follow = sites[ index ];
		const feed = getFeed( follow.feed_ID );
		const site = getSite( follow.blog_ID );

		if ( getSiteDescription( { feed, site } ) ) {
			return 85;
		}

		return 65;
	}

	render() {
		const { sites, width } = this.props;

		return (
			<div className="following-manage__sites-window-scroller">
				<WindowScroller>
					{ ( { height, scrollTop } ) => (
						<List
							autoHeight
							height={ height }
							rowCount={ sites.length }
							rowHeight={ this.getRowHeight }
							rowRenderer={ this.siteRowRenderer }
							scrollTop={ scrollTop }
							width={ width }
						/>
					)}
				</WindowScroller>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const getFeed = feedId => getReaderFeed( state, feedId );
	const getSite = siteId => getReaderSite( state, siteId );
	return { getFeed, getSite };
};

export default connect(
	mapStateToProps,
)( SitesWindowScroller );
