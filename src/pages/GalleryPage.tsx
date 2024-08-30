import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Generate an array of image paths
const images = Array.from(
	{ length: 16 },
	(_, i) => `/images/gallery/image-${i + 1}.jpg`,
);

const GalleryPage = () => {
	const { t } = useTranslation();
	const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [nav1, setNav1] = useState<Slider | null>(null);
	const [nav2, setNav2] = useState<Slider | null>(null);

	const mainSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		afterChange: (current: number) => setCurrentSlide(current),
	};

	const thumbnailSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		focusOnSelect: true,
		centerMode: true,
		centerPadding: '0px',
	};

	const openFullscreen = () => {
		setFullscreenImage(images[currentSlide]);
	};

	const closeFullscreen = () => {
		setFullscreenImage(null);
	};

	return (
		<div className='flex-grow'>
			<h1 className='text-6xl font-bold mb-10 text-center'>{t('gallery')}</h1>
			<div className='max-w-4xl mx-auto relative'>
				<Slider
					asNavFor={nav2 ?? undefined}
					ref={(slider1) => setNav1(slider1)}
					{...mainSettings}
				>
					{images.map((image, index) => (
						<div key={index} className='px-2'>
							<img
								src={image}
								alt={`Gallery image ${index + 1}`}
								className='w-full h-[50vh] object-cover'
							/>
						</div>
					))}
				</Slider>
				<Button
					onClick={openFullscreen}
					className='absolute bottom-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75'
				>
					<Maximize2 className='mr-2 h-4 w-4' />
					{t('fullscreen')}
				</Button>
			</div>
			<div className='max-w-4xl mx-auto mt-4'>
				<Slider
					asNavFor={nav1 ?? undefined}
					ref={(slider2) => setNav2(slider2)}
					{...thumbnailSettings}
				>
					{images.map((image, index) => (
						<div key={index} className='px-1 mx-4'>
							<img
								src={image}
								alt={`Thumbnail ${index + 1}`}
								className='w-full h-16 object-cover cursor-pointer rounded-md'
							/>
						</div>
					))}
				</Slider>
			</div>
			{fullscreenImage && (
				<div
					className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'
					onClick={closeFullscreen}
				>
					<img
						src={fullscreenImage}
						alt='Fullscreen'
						className='max-w-full max-h-full'
					/>
				</div>
			)}
		</div>
	);
};

export default GalleryPage;