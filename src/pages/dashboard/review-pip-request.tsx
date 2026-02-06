import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, Download, Eye, MoveLeft } from 'lucide-react';
import DropdownComponent from '@/components/dropdown';
import { DropdownMenu } from 'radix-ui';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes';
import CircularBar from '@/components/circular-bar';

// -----------------------------
// Dummy Data
// -----------------------------
const employee = {
  name: 'Kehinde Adeyemo',
  email: 'kehinde.adeyemo@sterling.ng',
  jobRole: 'Software Engineer',
  group: 'Engineering',
  supervisor: 'Erhuwvu Oghene',
  pipType: 'First Review',
  pipStatus: 'Pending 2nd Line Manager',
  score: 77,
  expectation: 'The employee is expected to show measurable improvement in identified areas by meeting agreed KPIs within the review period, applying feedback, and demonstrating consistent progress toward required performance standards.',
  document: 'KPIExpectationdoc.pdf',
};

const kpis = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  target: 'Achieve at least a 15% increase in customer engagement (click-throughs, responses, or sign-ups) on digital campaigns within 3 months.',
  result: 'Successfully drove a 17% increase in customer engagement on digital campaigns within 3 months by optimizing content, improving targeting, and implementing timely follow-ups.',
  evidence: 'Evidence.pdf',
}));

export default function PIPReviewDetails() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex items-center justify-between'>
        <Button 
        onClick={() => navigate(`${RoutePath.DASHBOARD}/${RoutePath.VIEW_PIP_REQUESTS}`)}
        className="mb-4 bg-transparent text-[#000000] text-lg flex items-center gap-1 hover:bg-gray-100">
          <MoveLeft size={20}/> <span className="ml-2">Go Back</span>
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-2">
                        <DropdownComponent
                          hideIcon
                          position="start"
                          triggerButton={
                            <Button
                              type="button"
                              
                              className="h-[36px] border border-red-500 px-2 md:px-4 text-[#DB353A] bg-red-100 rounded-4xl"
                            >
                              
                              <span className="ml-2 text-[14px]">
                                Action
                              </span>
                              <ChevronDown />
                            </Button>
                          }
                          dropdownContentClassName=""
                        >
                          <DropdownMenu.Item
                            onClick={() => {
                              console.log("Approve PIP Review");
                            }}
                            className="flex gap-3 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer dark:text-light-400 hover:bg-gray-100 dark:hover:bg-theme-dark"
                          >
                            <span>Download PIP</span>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            onClick={() => {
                              console.log("Approve PIP Review");
                            }}
                            className="flex gap-3 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer dark:text-light-400 hover:bg-gray-100 dark:hover:bg-theme-dark"
                          >
                            
                            <span>Nudge employee</span>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            onClick={() => {
                              console.log("Approve PIP Review");
                            }}
                            className="flex gap-3 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer dark:text-light-400 hover:bg-gray-100 dark:hover:bg-theme-dark"
                          >
                            
                            <span>Nudge Line manager</span>
                          </DropdownMenu.Item>

                          <DropdownMenu.Item
                            onClick={() => {
                              console.log("Approve PIP Review");
                            }}
                            className="flex gap-3 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer dark:text-light-400 hover:bg-gray-100 dark:hover:bg-theme-dark"
                          >
                            
                            <span>Nudge second level manager</span>
                          </DropdownMenu.Item>
                        </DropdownComponent>
              </div>
      </div>
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Employee Info */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Employee Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Name', value: employee.name },
            { label: 'Email', value: employee.email },
            { label: 'Job Role', value: employee.jobRole },
            { label: 'Group', value: employee.group },
            { label: 'Supervisor', value: employee.supervisor },
            { label: 'PIP Type', value: employee.pipType, highlight: true },
            { label: 'Overall Score', value: `${employee.score}%` },
            { label: 'PIP Status', value: employee.pipStatus, highlight: true },
            { label: 'Group', value: employee.group },
          ].map((item, i) => (
            <Card key={i} className="bg-[#F9F9F9]">
              <CardContent className="">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className={`font-medium ${item.highlight ? 'text-orange-500' : ''}`}>{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Expectation */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Employee Expectation</h2>
        <p className="text-slate-700">{employee.expectation}</p>
        <Card className="mt-4 w-fit">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-red-100 flex items-center justify-center rounded">
              <span className="text-red-600 font-bold">PDF</span>
            </div>
            <div>
              <p className="text-sm">{employee.document}</p>
              <Button variant="link" size="sm" className="p-0 text-red-600 flex items-center gap-1">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">KPI</h2>
        <div className="space-y-4">
          {kpis.map(kpi => (
            <Card key={kpi.id} className="bg-slate-50">
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-500">{kpi.target}</p>
                <p className="text-sm font-medium">{kpi.result}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-red-600">{kpi.evidence}</span>
                  <Button size="sm" variant="outline" className="flex items-center gap-1 text-red-600">
                    <Eye className="h-4 w-4" /> View Rating
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Score */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Employee Overall Score</h2>
        <div className="flex items-center gap-4">
          <div className="w-24">
            <CircularBar
  totalCount={employee.score}
  color="#ef4444"           // red-500
/>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Line Manager’s Recommendation</h2>
        <Card><CardContent className="">Take Off PIP</CardContent></Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Line Manager’s Comment</h2>
        <Card><CardContent className="p-3">{kpis[0].result}</CardContent></Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Second Line Manager’s Recommendation</h2>
        <Card><CardContent className="">Take Off PIP</CardContent></Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Second Line Manager’s Comment</h2>
        <Card><CardContent className="">{kpis[0].result}</CardContent></Card>
      </div>

      {/* Comment Box */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Enter Comment</h2>
        <Textarea placeholder="Type here" rows={4} />
      </div>

      <Button className="bg-red-600 hover:bg-red-700">Approve Employee PIP Review</Button>
    </div>
    </div>
  );
}
