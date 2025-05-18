const DiscoverSection = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row w-full gap-3 md:gap-6">
        <div className="flex flex-col w-full sm:w-2/3">
          <img
            src="/gradient-3.jpg"
            alt="discover"
            className="aspect-video sm:aspect-14/9 rounded-lg object-cover"
          />
          <ContentInfo
            title="Introducing Orbit 3 in the API"
            subtitle="Release"
            date="Feb 14th 2025"
          />
        </div>

        <div className="flex flex-col w-full sm:w-1/3 gap-3">
          <div className="w-full flex flex-col">
            <img
              src="/gradient-1.jpg"
              alt="discover"
              className="aspect-video rounded-lg object-cover"
            />
            <ContentInfo
              title="Model 2 for General Purpose"
              subtitle="Release"
              date="Oct 21th 2024"
            />
          </div>
          <div className="w-full flex flex-col">
            <img
              src="/gradient-2.jpg"
              alt="discover"
              className="aspect-video rounded-lg object-cover"
            />
            <ContentInfo
              title="Orbit AI v1"
              subtitle="Release"
              date="Aug 2nd 2024"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 md:gap-8 my-16 lg:my-32">
        <div className="flex flex-col">
          <img
            src="/gen-image-3.jpg"
            alt="discover"
            className="aspect-square rounded-lg object-cover"
          />
          <ContentInfo
            title="Whispers of the Verdant Hills"
            subtitle="Orbit 3 Image"
            date="May 6th 2025"
          />
        </div>
        <div className="flex flex-col">
          <img
            src="/gen-image-2.jpg"
            alt="discover"
            className="aspect-square rounded-lg object-cover"
          />
          <ContentInfo
            title="Golden Oracle"
            subtitle="Orbit 3 Image"
            date="April 1st 2025"
          />
        </div>
        <div className="flex flex-col">
          <img
            src="/gen-image-1.jpg"
            alt="discover"
            className="aspect-square rounded-lg object-cover"
          />
          <ContentInfo
            title="Melody of Shadows"
            subtitle="Orbit 3 Image"
            date="Mar 16th 2025"
          />
        </div>
      </div>
    </div>
  );
};
export default DiscoverSection;

const ContentInfo = ({
  title,
  subtitle,
  date,
}: {
  title: string;
  subtitle: string;
  date: string;
}) => {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-xl font-medium mt-2">{title}</h3>
      <div className="flex gap-2 md:gap-4 flex-row items-start md:items-center text-sm mt-2 md:mt-1">
        <span className="text-white">{subtitle}</span>
        <span className="text-neutral-500">{date}</span>
      </div>
    </div>
  );
};
