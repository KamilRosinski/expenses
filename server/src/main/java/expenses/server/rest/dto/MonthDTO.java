package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class MonthDTO {

	private final Long id;

	private final Integer year;

	private final Integer month;

	private final Integer length;

	private final List<TransactionDTO> transactions;

	private final List<PredictionDTO> predictions;

}
