import { StyleDeferralRow, type StyleHandle } from './StyleDeferralRow';

export const StyleList = ( {
	styles,
	onToggle,
}: {
	styles: StyleHandle[];
	onToggle: ( id: string, isDeferred: boolean ) => void;
} ) => {
	if ( styles.length === 0 ) {
		return (
			<div className="flex-1 min-h-[200px] flex items-center justify-center bg-white p-8 box-border">
				<h4 className="text-sm text-slate-500 font-medium m-0">
					No Render-Blocking Stylesheets Found
				</h4>
			</div>
		);
	}

	return (
		<ul className="max-h-[400px] p-4 flex flex-col gap-2 bg-white m-0 list-none">
			{ styles.map( ( style ) => (
				<StyleDeferralRow
					key={ style.id }
					style={ style }
					onToggle={ onToggle }
				/>
			) ) }
		</ul>
	);
};
