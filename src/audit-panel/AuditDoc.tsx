import { useState } from '@wordpress/element';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

type Step = {
	title: string;
	desc: string;
};

const STEPS: Step[] = [
	{
		title: 'Defer a Style',
		desc: 'Click on any stylesheet to temporarily remove its styling. This shows you what the page looks like for a fraction of second during load.',
	},
	{
		title: 'Check the Look',
		desc: "Look at the top of your site. If it still looks readable and organized without that style, it's a great candidate to stay deferred.",
	},
	{
		title: 'Revert if Broken',
		desc: 'If the page looks messy or the header breaks, that style is important for the first impression. Click it again to turn it back on.',
	},
	{
		title: 'Finish & Copy',
		desc: "Once finished, click 'Copy Handles' to get your optimized list and add it to your MachStyle settings.",
	},
];

export const AuditDoc = () => {
	const [ isDocsOpen, setIsDocsOpen ] = useState( false );

	return (
		<div className="border-b border-slate-100 bg-slate-50/50">
			<button
				onClick={ () => setIsDocsOpen( ! isDocsOpen ) }
				className="cursor-pointer bg-transparent border-none w-full flex items-center justify-between p-4 hover:bg-slate-100/50 transition-colors"
			>
				<div className="flex items-center gap-2 text-slate-600">
					<BookOpen className="w-3.5 h-3.5" />
					<span className="text-xs font-bold uppercase tracking-widest">
						How to Audit
					</span>
				</div>
				{ isDocsOpen ? (
					<ChevronUp className="w-4 h-4 text-slate-400" />
				) : (
					<ChevronDown className="w-4 h-4 text-slate-400" />
				) }
			</button>

			{ isDocsOpen && (
				<ol className="space-y-3 px-4 pb-4 pt-2 m-0">
					{ STEPS.map( ( item, i ) => (
						<li key={ i } className="flex gap-3" role="group">
							<span className="shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
								{ i + 1 }
							</span>
							<p className="text-xs text-slate-700 m-0">
								<strong className="font-semibold">
									{ item.title }:
								</strong>{ ' ' }
								{ item.desc }
							</p>
						</li>
					) ) }
				</ol>
			) }
		</div>
	);
};
