import { useState, useRef } from '@wordpress/element';

export const useDraggablePanel = () => {
	const [ position, setPosition ] = useState( {
		x: window.innerWidth - 440,
		y: 40,
	} );
	const dragInfo = useRef( {
		isDragging: false,
		offsetX: 0,
		offsetY: 0,
		width: 400,
		height: 600,
	} );

	const handlePointerDown = ( e: any ) => {
		const rect = e.currentTarget.parentElement.getBoundingClientRect();
		dragInfo.current = {
			isDragging: true,
			offsetX: e.clientX - rect.left,
			offsetY: e.clientY - rect.top,
			width: rect.width,
			height: rect.height,
		};
		e.currentTarget.setPointerCapture( e.pointerId );
	};

	const handlePointerMove = ( e: any ) => {
		if ( ! dragInfo.current.isDragging ) {
			return;
		}

		let newX = e.clientX - dragInfo.current.offsetX;
		let newY = e.clientY - dragInfo.current.offsetY;

		const maxX = window.innerWidth - dragInfo.current.width;
		const maxY = window.innerHeight - dragInfo.current.height;

		newX = Math.max( 0, Math.min( newX, maxX ) );
		newY = Math.max( 0, Math.min( newY, maxY ) );

		setPosition( { x: newX, y: newY } );
	};

	const handlePointerUp = ( e: any ) => {
		dragInfo.current.isDragging = false;
		e.currentTarget.releasePointerCapture( e.pointerId );
	};

	return {
		position,
		pointerHandlers: {
			onPointerDown: handlePointerDown,
			onPointerMove: handlePointerMove,
			onPointerUp: handlePointerUp,
			onPointerCancel: handlePointerUp,
		},
	};
};
