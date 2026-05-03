import classNames from 'classnames';

export type StyleHandle = {
	id: string;
	name: string;
	isDeferred: boolean;
};

export const StyleDeferralRow = ( {
	style,
	onToggle,
}: {
	style: StyleHandle;
	onToggle: ( id: string, isDeferred: boolean ) => void;
} ) => {
	return (
		<li className="list-none">
			<button
				type="button"
				className={ classNames(
					'w-full flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all select-none active:scale-[0.98]',
					{
						'bg-emerald-50 border-emerald-200 shadow-xs':
							style.isDeferred,
						'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50':
							! style.isDeferred,
					}
				) }
				role="switch"
				aria-checked={ style.isDeferred }
				onClick={ () => onToggle( style.id, ! style.isDeferred ) }
			>
				<span
					className={ classNames( 'text-sm font-semibold truncate', {
						'text-emerald-900': style.isDeferred,
						'text-slate-700': ! style.isDeferred,
					} ) }
					title={ style.id }
				>
					{ style.name }
				</span>
				{ style.isDeferred ? (
					<span className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider border bg-emerald-600 text-white border-emerald-600">
						Deferred
					</span>
				) : (
					<span className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider border bg-white text-slate-400 border-slate-200 group-hover:border-blue-300">
						Defer
					</span>
				) }
			</button>
		</li>
	);
};
