import { useState } from '@wordpress/element';
import { StyleList } from './StyleList';
import { useAuditPanelVisibility } from '@/hooks/useAuditPanelVisibility';
import { useDraggablePanel } from '@/hooks/useDraggablePanel';
import { useStylesheets } from '@/hooks/useStylesheets';
import { CheckCircle2, Clipboard, RefreshCw, X, Zap } from 'lucide-react';
import { AuditDoc } from './AuditDoc';
import classNames from 'classnames';

export const App = () => {
	const { isPanelOpen, setIsPanelOpen } = useAuditPanelVisibility();
	const { position, pointerHandlers } = useDraggablePanel();
	const { styles, toggleStyle, resetStyles } = useStylesheets( isPanelOpen );
	const [ isCopied, setIsCopied ] = useState( false );

	const handleCopy = async () => {
		const deferredHandles = styles
			.filter( ( s ) => s.isDeferred )
			.map( ( s ) => s.id );
		const copyText =
			deferredHandles.length > 0 ? deferredHandles.join( ',' ) + ',' : '';
		await navigator.clipboard.writeText( copyText );
		setIsCopied( true );
		setTimeout( () => setIsCopied( false ), 2000 );
	};

	if ( ! isPanelOpen ) {
		return null;
	}

	const deferredCount = styles.filter( ( s ) => s.isDeferred ).length;

	return (
		<div
			className="fixed z-99999 w-[400px] flex flex-col bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden font-sans text-slate-900 box-border"
			style={ {
				left: `${ position.x }px`,
				top: `${ position.y }px`,
				margin: 0,
			} }
		>
			<div
				className="border-b border-slate-200 flex items-center gap-2 justify-between px-4 h-12 cursor-move box-border"
				{ ...pointerHandlers }
			>
				<div className="flex items-center gap-2 w-full">
					<Zap className="block w-4 h-4 text-white fill-white bg-blue-600 p-1 rounded" />
					<h3 className="text-base font-semibold text-slate-800 tracking-tight select-none">
						MachStyle Auditor
					</h3>
				</div>
				<button
					onClick={ resetStyles }
					onPointerDown={ ( e ) => e.stopPropagation() }
					title="Reset All"
					className="bg-transparent border-none p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 cursor-pointer"
				>
					<RefreshCw className="block w-4 h-4" />
				</button>
				<button
					onClick={ () => setIsPanelOpen( false ) }
					onPointerDown={ ( e ) => e.stopPropagation() }
					title="Close"
					className="bg-transparent border-none p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 cursor-pointer"
				>
					<X className="block w-5 h-5" />
				</button>
			</div>
			<AuditDoc />
			<StyleList styles={ styles } onToggle={ toggleStyle } />
			<div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0">
				<button
					onClick={ handleCopy }
					disabled={ deferredCount <= 0 }
					className={ classNames(
						'w-full flex items-center justify-center gap-2 font-bold py-3 rounded-md border-none transition-all',
						{
							'bg-blue-600 text-white cursor-pointer hover:bg-blue-700 shadow-blue-100 active:scale-[0.98]':
								deferredCount > 0,
							'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-slate-200':
								deferredCount <= 0,
						}
					) }
				>
					{ isCopied ? (
						<>
							<CheckCircle2 className="w-4 h-4" />
							<span className="text-sm tracking-tight">
								Copied!
							</span>
						</>
					) : (
						<>
							<Clipboard className="w-4 h-4" />
							<span className="text-sm tracking-tight">
								Copy Handles
							</span>
						</>
					) }
				</button>
			</div>
		</div>
	);
};
