type StyleHandlesRendererProps = {
	styleHandles: string[];
};

export const StyleHandlesRenderer = ( {
	styleHandles,
}: StyleHandlesRendererProps ) => {
	return (
		<div>
			{ styleHandles.map( ( handle ) => (
				<span
					key={ handle }
					className="text-md text-[var(--wp-admin-theme-color)] border border-[var(--wp-admin-theme-color)] mx-1 px-2 py-1 rounded"
				>
					{ handle }
				</span>
			) ) }
		</div>
	);
};
