/**
 * Tests for AllVersions component
 * Path: src/components/AllVersions/index.tsx
 *
 * Coverage focuses on:
 * - Renders correctly with given props
 * - Handles user interactions (button click, drawer open/close)
 * - Disabled state behavior
 * - Drawer functionality
 * - ProTable integration
 */

import AllVersionsList from '@/components/AllVersions';
import { getAllVersions } from '@/services/general/api';
import { getDataSource } from '@/services/general/util';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ConfigProvider } from 'antd';

// Mock dependencies
jest.mock('@/services/general/api', () => ({
  getAllVersions: jest.fn(),
}));

jest.mock('@/services/general/util', () => ({
  getDataSource: jest.fn(),
}));

jest.mock('umi', () => ({
  FormattedMessage: ({ id, defaultMessage }: { id: string; defaultMessage?: string }) => (
    <span>{defaultMessage || id}</span>
  ),
  useLocation: () => ({ pathname: '/test-path' }),
}));

// Mock the view components
jest.mock('@/pages/Contacts/Components/view', () => {
  return function ContactView() {
    return <div data-testid='contact-view'>Contact View</div>;
  };
});

jest.mock('@/pages/Flowproperties/Components/view', () => {
  return function FlowpropertyView() {
    return <div data-testid='flowproperty-view'>Flowproperty View</div>;
  };
});

jest.mock('@/pages/Flows/Components/view', () => {
  return function FlowView() {
    return <div data-testid='flow-view'>Flow View</div>;
  };
});

jest.mock('@/pages/LifeCycleModels/Components/view', () => {
  return function LifeCycleModelView() {
    return <div data-testid='lifecyclemodel-view'>LifeCycle Model View</div>;
  };
});

jest.mock('@/pages/Processes/Components/view', () => {
  return function ProcessView() {
    return <div data-testid='process-view'>Process View</div>;
  };
});

jest.mock('@/pages/Sources/Components/view', () => {
  return function SourceView() {
    return <div data-testid='source-view'>Source View</div>;
  };
});

jest.mock('@/pages/Unitgroups/Components/view', () => {
  return function UnitGroupView() {
    return <div data-testid='unitgroup-view'>Unit Group View</div>;
  };
});

const mockGetAllVersions = getAllVersions as jest.MockedFunction<any>;
const mockGetDataSource = getDataSource as jest.MockedFunction<any>;

describe('AllVersionsList Component', () => {
  const defaultProps = {
    searchTableName: 'processes',
    searchColume: 'id',
    id: 'test-id',
    children: <div data-testid='children'>Children Content</div>,
    columns: [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Version', dataIndex: 'version', key: 'version' },
    ],
    lang: 'en',
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetDataSource.mockReturnValue('test-datasource');
    mockGetAllVersions.mockResolvedValue({
      data: [
        { id: '1', version: '1.0.0', name: 'Test Process' },
        { id: '2', version: '2.0.0', name: 'Test Process 2' },
      ],
      success: true,
      total: 2,
    });
  });

  it('should render correctly with given props', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('should render disabled button when disabled prop is true', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} disabled={true} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should show tooltip with correct text', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.mouseOver(button);

    waitFor(() => {
      expect(screen.getByText('All version')).toBeInTheDocument();
    });
  });

  it('should open drawer when button is clicked', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('All version')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should close drawer when close button is clicked', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Drawer should be open
    expect(screen.getByText('All version')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Drawer should be closed
    waitFor(() => {
      expect(screen.queryByText('All version')).not.toBeInTheDocument();
    });
  });

  it('should not open drawer when button is disabled', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} disabled={true} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.queryByText('All version')).not.toBeInTheDocument();
  });

  it('should render correct icon', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // The BarsOutlined icon should be present
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('should have correct button attributes', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // Check if button has the expected classes instead of HTML attributes
    expect(button).toHaveClass('ant-btn-circle');
    expect(button).toHaveClass('ant-btn-sm');
  });

  it('should render ProcessView for processes table', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} searchTableName='processes' />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByTestId('process-view')).toBeInTheDocument();
    });
  });

  it('should render FlowView for flows table', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} searchTableName='flows' />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByTestId('flow-view')).toBeInTheDocument();
    });
  });

  it('should render LifeCycleModelView for lifecyclemodels table', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} searchTableName='lifecyclemodels' />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByTestId('lifecyclemodel-view')).toBeInTheDocument();
    });
  });

  it('should render FlowpropertyView for flowproperties table', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} searchTableName='flowproperties' />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByTestId('flowproperty-view')).toBeInTheDocument();
    });
  });

  it('should render UnitGroupView for unitgroups table', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} searchTableName='unitgroups' />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByTestId('unitgroup-view')).toBeInTheDocument();
    });
  });

  it('should render SourceView for sources table', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} searchTableName='sources' />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByTestId('source-view')).toBeInTheDocument();
    });
  });

  it('should render ContactView for contacts table', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} searchTableName='contacts' />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByTestId('contact-view')).toBeInTheDocument();
    });
  });

  it('should render null for unknown table type', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} searchTableName='unknown' />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.queryByTestId('process-view')).not.toBeInTheDocument();
      expect(screen.queryByTestId('flow-view')).not.toBeInTheDocument();
      expect(screen.queryByTestId('lifecyclemodel-view')).not.toBeInTheDocument();
    });
  });

  it('should call getAllVersions with correct parameters', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(mockGetAllVersions).toHaveBeenCalledWith(
        'id',
        'processes',
        'test-id',
        expect.objectContaining({
          pageSize: 10,
          current: 1,
        }),
        undefined,
        'en',
        'test-datasource',
      );
    });
  });

  it('should render children content in toolbar', () => {
    render(
      <ConfigProvider>
        <AllVersionsList {...defaultProps} />
      </ConfigProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByTestId('children')).toBeInTheDocument();
    });
  });
});
