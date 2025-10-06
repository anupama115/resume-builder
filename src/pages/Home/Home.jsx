import { useNavigate } from 'react-router-dom';

const RESUME_TEMPLATE = {
	id: 1,
	name: 'Template 1',
	description: 'Classic Resume Template',
	image: '/images/1.jpg',
};

// Template Card
const TemplateCard = ({ template, onSelect }) => (
	<div className="relative hidden md:block p-4 md:p-6">
		<div className="bg-white rounded-xl shadow-2xl max-w-lg">
			<div>
				<img src={template.image} alt={template.name} className="object-cover" />
			</div>
			<div className="p-4 bg-gray-100">
				<h3 className="font-semibold text-gray-700">{template.name}</h3>
				<p className="mt-1 text-sm text-gray-700 pb-3">{template.description}</p>
				<button
					onClick={onSelect}
					className="inline-flex items-center rounded-md bg-gray-800 px-5 py-3 text-white text-sm font-medium"
				>
					Use this Template
				</button>
			</div>
		</div>
	</div>
);

const Home = () => {
	const navigate = useNavigate();

	const handleSelectTemplate = () => {
		navigate('/details');
	};

	return (
		<div className="bg-white">
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
				<div className="grid gap-10 md:grid-cols-2 items-center">
					{/* Hero copy */}
					<div>
						<h1 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
							<span className="block">CV</span>
							<span className="block">Template</span>
						</h1>
						<p className="mt-6 max-w-xl text-lg text-gray-600">
							Get adjustable and editable CV template for your next professional business
						</p>
						<div className="mt-8">
							<button
								onClick={handleSelectTemplate}
								className="inline-flex items-center rounded-md bg-gray-800 px-5 py-3 text-white text-sm font-medium"
							>
								Start with this template
							</button>
						</div>
					</div>

					{/* Template preview */}
					<TemplateCard template={RESUME_TEMPLATE} onSelect={handleSelectTemplate} />
				</div>
			</section>
		</div>
	);
};

export default Home;