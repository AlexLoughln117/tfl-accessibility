import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Guide - Free Flow Routes',
  description: 'Information about accessibility features on London\'s transport network and how to use our journey planner',
};

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Accessibility Guide</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Understanding Accessibility on TfL</h2>
          <p>
            Transport for London (TfL) offers various accessibility features across its network. 
            This guide helps you understand what accessibility features are available and how to use 
            our journey planner to find accessible routes.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Types of Step-Free Access</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Step-free from street to platform:</strong> You can reach the platform without 
              using steps or escalators, but may need assistance to board the train.
            </li>
            <li>
              <strong>Step-free from street to train:</strong> Full accessibility from street level 
              to boarding the train, with level access or manual boarding ramps available.
            </li>
            <li>
              <strong>Partially step-free:</strong> Some routes within the station may be step-free, 
              but not all platforms or entrances are accessible.
            </li>
          </ul>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Using Our Journey Planner</h2>
          <p>
            Our journey planner is designed to help you find accessible routes across London. 
            Here's how to make the most of its accessibility features:
          </p>
          
          <ol className="list-decimal pl-6 space-y-3 mt-4">
            <li>
              <strong>Select your start and destination stations</strong> from the dropdown menus.
            </li>
            <li>
              <strong>Review the accessibility information</strong> that appears below each selected station.
            </li>
            <li>
              <strong>Choose your route preference</strong> - you can prioritize routes with fewer transfers 
              or less walking distance.
            </li>
            <li>
              <strong>Make sure "Show accessibility info" is enabled</strong> to see step-free access information.
            </li>
            <li>
              <strong>Click "Show Route"</strong> to display your journey with accessibility details for each leg.
            </li>
          </ol>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mt-6">
            <h4 className="font-medium text-lg mb-2">Tip</h4>
            <p>
              If you select "Less walking" as your preference, the journey planner will try to minimize 
              the walking distance between connections, which can be helpful for wheelchair users or 
              those with mobility impairments.
            </p>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Accessibility Features on TfL Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-medium mb-3">Tube</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Around 80 step-free stations</li>
                <li>Boarding ramps at many stations</li>
                <li>Priority seating</li>
                <li>Audio and visual announcements</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-medium mb-3">Buses</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>All buses are wheelchair accessible</li>
                <li>Ramps for easy boarding</li>
                <li>Priority seating and wheelchair space</li>
                <li>Audio and visual announcements</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-medium mb-3">DLR</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>All stations are step-free</li>
                <li>Level boarding on most platforms</li>
                <li>Priority seating</li>
                <li>Audio and visual announcements</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-medium mb-3">London Overground</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Many step-free stations</li>
                <li>Staff assistance for boarding</li>
                <li>Priority seating and wheelchair spaces</li>
                <li>Audio and visual announcements</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a 
                href="https://tfl.gov.uk/transport-accessibility/" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                TfL Accessibility Guide
              </a>
            </li>
            <li>
              <a 
                href="https://tfl.gov.uk/transport-accessibility/wheelchair-access-and-avoiding-stairs" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                TfL Wheelchair Access Information
              </a>
            </li>
            <li>
              <a 
                href="https://tfl.gov.uk/transport-accessibility/help-from-staff" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Staff Assistance on TfL
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
} 