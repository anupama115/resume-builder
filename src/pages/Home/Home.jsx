import { useNavigate } from 'react-router-dom';

const RESUME_TEMPLATE = {
	id: 1,
	name: 'Template 1',
	description: 'Classic Resume Template',
	image: '/images/1.jpg',
};

// Template Card
const TemplateCard = ({ template, onSelect }) => (
	<div className="relative p-4 md:p-6">
		<div className="bg-white rounded-xl shadow-2xl max-w-lg mx-auto">
			<div>
				<img src={template.image} alt={template.name} className="w-full h-auto object-cover rounded-t-xl" />
			</div>
			<div className="p-4 bg-gray-100 rounded-b-xl">
				<h3 className="font-semibold text-gray-700">{template.name}</h3>
				<p className="mt-1 text-sm text-gray-700 pb-3">{template.description}</p>
				<button
					onClick={onSelect}
					className="inline-flex items-center rounded-md bg-gray-800 px-5 py-3 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
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
		<div className="bg-white min-h-screen">
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid gap-8 md:gap-10 md:grid-cols-2 items-center">
					{/* Hero copy */}
					<div className="text-center md:text-left">
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold">
							<span className="block">CV</span>
							<span className="block">Template</span>
						</h1>
						<p className="mt-4 md:mt-6 max-w-xl text-base md:text-lg text-gray-600 mx-auto md:mx-0">
							Get adjustable and editable CV template for your next professional business
						</p>
						<div className="mt-6 md:mt-8">
							<button
								onClick={handleSelectTemplate}
								className="inline-flex items-center rounded-md bg-gray-800 px-6 py-3 text-white text-sm font-medium hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
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