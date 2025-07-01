import React from "react";
import { Alert } from "antd";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.children !== this.props.children)
      this.setState({ error: false, errorInfo: null });
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Alert
          style={{ width: "100%" }}
          message="Ошибка отрисовки компонента..."
          description={this.state.error && this.state.error.toString()}
          type="error"
          showIcon
        />
      );
    }

    return this.props.children;
  }
}
