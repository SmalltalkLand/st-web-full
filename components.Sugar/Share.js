import React, {useEffect} from 'react'
export default props => {
	useEffect(() => {
		let presence = props.activity.getPresenceObject(function (error, network) {
			if (error) {
				console.log("Sharing error");
				return;
			}
			network.createSharedActivity('org.sugarlabs.Pawn', function (groupId) {
				console.log("Activity shared");
			});
			network.onDataReceived(props.onNetworkDataReceived);
		});
		props.setPresence(presence);
	}); return props.children}